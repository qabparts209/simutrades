import pytest
import time
from app.core.cache import CacheManager

@pytest.fixture
async def cache_manager():
    return CacheManager()

async def test_cache_hit_performance(cache_manager):
    """Test cache hit performance"""
    key = "test_key"
    value = {"data": "test_value"}
    
    # Set cache
    await cache_manager.set(key, value)
    
    # Measure cache hit time
    start_time = time.time()
    cached_value = await cache_manager.get(key)
    hit_time = time.time() - start_time
    
    assert cached_value == value
    assert hit_time < 0.01  # Cache hit should be under 10ms

async def test_cache_invalidation(cache_manager):
    """Test cache invalidation"""
    key = "test_key"
    value = {"data": "test_value"}
    
    # Set cache
    await cache_manager.set(key, value)
    
    # Invalidate cache
    await cache_manager.delete(key)
    
    # Verify cache is invalid
    cached_value = await cache_manager.get(key)
    assert cached_value is None

async def test_cache_consistency(cache_manager):
    """Test cache consistency"""
    key = "test_key"
    value = {"data": "test_value"}
    
    # Set cache with multiple processes
    tasks = []
    for _ in range(10):
        tasks.append(cache_manager.set(key, value))
    
    await asyncio.gather(*tasks)
    
    # Verify cache consistency
    cached_value = await cache_manager.get(key)
    assert cached_value == value

async def test_cache_performance_under_load(cache_manager):
    """Test cache performance under load"""
    # Generate test data
    test_data = {f"key_{i}": f"value_{i}" for i in range(1000)}
    
    # Measure bulk set performance
    start_time = time.time()
    tasks = []
    for key, value in test_data.items():
        tasks.append(cache_manager.set(key, value))
    await asyncio.gather(*tasks)
    set_time = time.time() - start_time
    
    assert set_time < 1.0  # Bulk set should be under 1 second
    
    # Measure bulk get performance
    start_time = time.time()
    tasks = []
    for key in test_data.keys():
        tasks.append(cache_manager.get(key))
    results = await asyncio.gather(*tasks)
    get_time = time.time() - start_time
    
    assert get_time < 0.5  # Bulk get should be under 500ms
    assert len(results) == len(test_data) 