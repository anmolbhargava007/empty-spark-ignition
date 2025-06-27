
export default function componentStyleOverrides(theme) {
    const bgColor = theme?.customization?.isDarkMode ? theme.colors?.darkPrimary800 : '#F9F7FD'
    const inputBgColor = theme?.customization?.isDarkMode ? theme.colors?.darkPrimary800 : '#FFFFFF'
    
    return {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarWidth: 'thin',
                    scrollbarColor: theme?.customization?.isDarkMode
                        ? `${theme.colors?.primaryMain} ${theme.colors?.darkPrimaryMain}`
                        : `${theme.colors?.primaryMain} ${theme.paper}`,
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        width: 8,
                        height: 8,
                        backgroundColor: theme?.customization?.isDarkMode ? theme.colors?.darkPrimaryMain : theme.paper
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: 8,
                        backgroundColor: theme?.customization?.isDarkMode ? theme.colors?.primaryMain : theme.colors?.primaryMain,
                        minHeight: 24,
                        border: `2px solid ${theme?.customization?.isDarkMode ? theme.colors?.darkPrimaryMain : theme.paper}`
                    },
                    '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
                        backgroundColor: theme?.customization?.isDarkMode ? theme.colors?.primaryDark : theme.colors?.primaryDark
                    },
                    '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
                        backgroundColor: theme?.customization?.isDarkMode ? theme.colors?.primaryDark : theme.colors?.primaryDark
                    },
                    '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: theme?.customization?.isDarkMode ? theme.colors?.primaryDark : theme.colors?.primaryDark
                    },
                    '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
                        backgroundColor: theme?.customization?.isDarkMode ? theme.colors?.darkPrimaryMain : theme.paper
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                    borderRadius: '4px',
                    textTransform: 'none',
                    backgroundColor: theme.colors?.primaryMain,
                    color: '#ffffff',
                    '&:hover': {
                        backgroundColor: theme.colors?.primaryDark,
                    }
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: theme?.customization?.isDarkMode ? theme.colors?.paper : 'inherit',
                    background: theme?.customization?.isDarkMode ? theme.colors?.darkPrimaryLight : 'inherit'
                }
            }
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: theme?.customization?.isDarkMode ? theme.colors?.darkPaper : '#ffffff'
                },
                rounded: {
                    borderRadius: `${theme?.customization?.borderRadius}px`
                }
            }
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    color: theme.colors?.textDark,
                    padding: '24px',
                    backgroundColor: theme?.customization?.isDarkMode ? theme.colors?.darkPaper : '#ffffff'
                },
                title: {
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: theme.heading
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '24px',
                    backgroundColor: theme?.customization?.isDarkMode ? theme.colors?.darkPaper : '#ffffff'
                }
            }
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    padding: '24px',
                    backgroundColor: theme?.customization?.isDarkMode ? theme.colors?.darkPaper : '#ffffff'
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    color: theme.darkTextPrimary,
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    borderRadius: '8px',
                    margin: '2px 8px',
                    '&.Mui-selected': {
                        color: theme.colors?.primaryDark,
                        backgroundColor: theme.colors?.secondaryLight,
                        fontWeight: 600,
                        '&:hover': {
                            backgroundColor: theme.colors?.secondaryLight
                        },
                        '& .MuiListItemIcon-root': {
                            color: theme.colors?.primaryDark
                        }
                    },
                    '&:hover': {
                        backgroundColor: theme.colors?.secondaryLight,
                        color: theme.colors?.primaryDark,
                        '& .MuiListItemIcon-root': {
                            color: theme.colors?.primaryDark
                        }
                    }
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: theme.darkTextPrimary,
                    minWidth: '36px'
                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    color: theme.textDark,
                    fontWeight: 500
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    color: theme.textDark,
                    '&::placeholder': {
                        color: theme.darkTextSecondary,
                        fontSize: '0.875rem'
                    },
                    '&.Mui-disabled': {
                        WebkitTextFillColor: theme?.customization?.isDarkMode ? theme.colors?.grey500 : theme.darkTextSecondary
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    background: inputBgColor,
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.colors?.grey300
                    },
                    '&:hover $notchedOutline': {
                        borderColor: theme.colors?.primaryLight
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.colors?.primaryMain
                    },
                    '&.MuiInputBase-multiline': {
                        padding: 1
                    }
                },
                input: {
                    fontWeight: 400,
                    background: inputBgColor,
                    padding: '15.5px 14px',
                    borderRadius: '8px',
                    '&.MuiInputBase-inputSizeSmall': {
                        padding: '10px 14px',
                        '&.MuiInputBase-inputAdornedStart': {
                            paddingLeft: 0
                        }
                    }
                },
                inputAdornedStart: {
                    paddingLeft: 4
                },
                notchedOutline: {
                    borderRadius: '8px'
                }
            }
        },
        MuiSlider: {
            styleOverrides: {
                root: {
                    color: theme.colors?.primaryMain,
                    '&.Mui-disabled': {
                        color: theme.colors?.grey300
                    }
                },
                mark: {
                    backgroundColor: theme.paper,
                    width: '4px'
                },
                valueLabel: {
                    color: theme?.colors?.primaryLight
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: theme.divider,
                    opacity: 1
                }
            }
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    color: theme.colors?.primaryDark,
                    background: theme.colors?.primary200
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    backgroundColor: theme.colors?.secondaryLight,
                    color: theme.colors?.primaryDark,
                    '&.MuiChip-deletable .MuiChip-deleteIcon': {
                        color: 'inherit'
                    }
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    color: '#ffffff',
                    background: '#334155',
                    fontSize: '0.75rem'
                }
            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                option: {
                    '&:hover': {
                        background: theme?.customization?.isDarkMode ? theme.colors?.darkSecondaryLight : theme.colors?.secondaryLight
                    },
                    '&.Mui-focused': {
                        background: theme?.customization?.isDarkMode ? theme.colors?.darkSecondaryLight : theme.colors?.secondaryLight
                    }
                }
            }
        }
    }
}
