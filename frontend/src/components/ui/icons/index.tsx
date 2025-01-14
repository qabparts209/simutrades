import React from 'react'

export const icons = {
  chevronDown: () => (
    <React.Fragment>
      <path d="M19 9l-7 7-7-7" stroke="currentColor" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </React.Fragment>
  ),
  chevronRight: () => (
    <React.Fragment>
      <path d="M9 5l7 7-7 7" stroke="currentColor" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </React.Fragment>
  ),
  search: () => (
    <React.Fragment>
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </React.Fragment>
  ),
  menu: () => (
    <React.Fragment>
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </React.Fragment>
  ),
  close: () => (
    <React.Fragment>
      <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </React.Fragment>
  ),
} as const 