// src/lib/constants.ts

export const base = "https://paullieberman.org"
export const currentYear: number = new Date().getFullYear()
export const minYear: number = 2004


export const currentMonthYear = new Date().toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        })
