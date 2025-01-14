from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.config import settings
import stripe

router = APIRouter()
stripe.api_key = settings.STRIPE_SECRET_KEY

@router.post("/create-payment-intent")
async def create_payment_intent(
    amount: int,
    currency: str = "usd",
    db: Session = Depends(get_db)
):
    try:
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency
        )
        return {"clientSecret": intent.client_secret}
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/confirm-payment")
async def confirm_payment(
    payment_intent_id: str,
    db: Session = Depends(get_db)
):
    try:
        intent = stripe.PaymentIntent.retrieve(payment_intent_id)
        return {"status": intent.status}
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/webhook")
async def stripe_webhook(
    request: Request,
    db: Session = Depends(get_db)
):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
        
        if event.type == "payment_intent.succeeded":
            await handle_successful_payment(event.data.object, db)
        elif event.type == "payment_intent.payment_failed":
            await handle_failed_payment(event.data.object, db)
            
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e)) 