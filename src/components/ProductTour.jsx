import React, { useState, useCallback, useEffect } from 'react'
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@mui/material'
import { TourIcon } from '@tabler/icons-react'

const ProductTour = () => {
    const [run, setRun] = useState(false)
    const [stepIndex, setStepIndex] = useState(0)
    const navigate = useNavigate()
    const location = useLocation()
    const [tourReady, setTourReady] = useState(false)

    const steps = [
        // Step 1 - Chatflows
        {
            target: '[data-tour="chatflows-menu"]',
            content: 'Welcome to Flowise! Let\'s start by exploring Chatflows - where you build conversational AI workflows.',
            placement: 'right',
            disableBeacon: true,
        },
        {
            target: '[data-tour="chatflows-add-new"]',
            content: 'Click the "Add New" button to create your first chatflow.',
            placement: 'bottom',
            route: '/chatflows'
        },
        {
            target: '[data-tour="canvas-area"]',
            content: 'This is the canvas where you can drag and drop nodes to build your AI workflow. Connect nodes by dragging from one output to another input.',
            placement: 'center',
        },
        {
            target: '[data-tour="save-button"]',
            content: 'Once you\'ve built your chatflow, use the Save button to save your work.',
            placement: 'bottom',
        },
        
        // Step 2 - Agentflows
        {
            target: '[data-tour="agentflows-menu"]',
            content: 'Next, let\'s explore Agentflows - for building multi-agent AI systems.',
            placement: 'right',
        },
        {
            target: '[data-tour="agentflows-add-new"]',
            content: 'Create a new agentflow by clicking the "Add New" button.',
            placement: 'bottom',
            route: '/agentflows'
        },
        {
            target: '[data-tour="agent-canvas"]',
            content: 'Similar to chatflows, drag and drop agent nodes here and connect them to create collaborative AI workflows.',
            placement: 'center',
        },
        {
            target: '[data-tour="save-agentflow"]',
            content: 'Save your agentflow configuration when you\'re done.',
            placement: 'bottom',
        },

        // Step 3 - Assistants
        {
            target: '[data-tour="assistants-menu"]',
            content: 'The Assistants section helps you manage different types of AI assistants.',
            placement: 'right',
        },
        {
            target: '[data-tour="assistant-types"]',
            content: 'Here you can see different assistant types like Custom, OpenAI, and Azure assistants. Click on any card to explore.',
            placement: 'bottom',
            route: '/assistants'
        },

        // Step 4 - Marketplace
        {
            target: '[data-tour="marketplace-menu"]',
            content: 'The Marketplace contains pre-built templates you can use as starting points.',
            placement: 'right',
        },
        {
            target: '[data-tour="marketplace-cards"]',
            content: 'Browse through available templates. Click on any card to preview and use templates.',
            placement: 'bottom',
            route: '/marketplaces'
        },

        // Step 5 - Tools
        {
            target: '[data-tour="tools-menu"]',
            content: 'Tools section lets you create and manage custom functions for your AI workflows.',
            placement: 'right',
        },
        {
            target: '[data-tour="create-tool"]',
            content: 'Click "+ Create" to add a new custom tool with your own logic.',
            placement: 'bottom',
            route: '/tools'
        },
        {
            target: '[data-tour="load-tool"]',
            content: 'Or use the "Load" button to import pre-existing tool templates.',
            placement: 'bottom',
        },

        // Step 6 - Credentials
        {
            target: '[data-tour="credentials-menu"]',
            content: 'Credentials help you securely store API keys and authentication details.',
            placement: 'right',
        },
        {
            target: '[data-tour="add-credential"]',
            content: 'Click "+ Add Credential" to securely store authentication details for external services.',
            placement: 'bottom',
            route: '/credentials'
        },

        // Step 7 - Variables
        {
            target: '[data-tour="variables-menu"]',
            content: 'Variables allow you to store and reuse values across your workflows.',
            placement: 'right',
        },
        {
            target: '[data-tour="add-variable"]',
            content: 'Create new variables by clicking the "+ Add Variable" button.',
            placement: 'bottom',
            route: '/variables'
        },

        // Step 8 - API Keys
        {
            target: '[data-tour="apikey-menu"]',
            content: 'API Keys section helps you manage access keys for your chatflows.',
            placement: 'right',
        },
        {
            target: '[data-tour="create-key"]',
            content: 'Generate new API keys by clicking the "+ Create Key" button.',
            placement: 'bottom',
            route: '/apikey'
        },

        // Step 9 - Document Stores
        {
            target: '[data-tour="documents-menu"]',
            content: 'Document Stores help you manage and query your knowledge base documents.',
            placement: 'right',
        },
        {
            target: '[data-tour="add-docstore"]',
            content: 'Create a new document store by clicking the "+ Add New" button to upload and manage your documents.',
            placement: 'bottom',
            route: '/document-stores'
        },
    ]

    const handleJoyrideCallback = useCallback((data) => {
        const { action, index, status, type } = data

        if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
            const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1)
            const nextStep = steps[nextStepIndex]

            // Navigate to the required route if specified
            if (nextStep && nextStep.route && location.pathname !== nextStep.route) {
                setTourReady(false)
                navigate(nextStep.route)
                // Delay to allow route navigation and DOM updates
                setTimeout(() => {
                    setTourReady(true)
                    setStepIndex(nextStepIndex)
                }, 300)
            } else {
                setStepIndex(nextStepIndex)
            }
        } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            setRun(false)
            setStepIndex(0)
            setTourReady(false)
        }
    }, [navigate, location.pathname, steps])

    // Handle route changes and DOM readiness
    useEffect(() => {
        if (run) {
            setTourReady(false)
            const timer = setTimeout(() => {
                setTourReady(true)
            }, 300)
            return () => clearTimeout(timer)
        }
    }, [location.pathname, run])

    const startTour = () => {
        setStepIndex(0)
        // Start from chatflows page
        if (location.pathname !== '/chatflows') {
            navigate('/chatflows')
            setTimeout(() => {
                setTourReady(true)
                setRun(true)
            }, 300)
        } else {
            setTourReady(true)
            setRun(true)
        }
    }

    const stopTour = () => {
        setRun(false)
        setStepIndex(0)
        setTourReady(false)
    }

    return (
        <>
            <Button
                variant="outlined"
                startIcon={<TourIcon size={16} />}
                onClick={startTour}
                sx={{
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                        borderColor: 'primary.dark',
                        backgroundColor: 'primary.main',
                        color: 'white'
                    }
                }}
            >
                Start Tour
            </Button>
            
            <Joyride
                steps={steps}
                run={run && tourReady}
                stepIndex={stepIndex}
                callback={handleJoyrideCallback}
                continuous={true}
                showProgress={true}
                showSkipButton={true}
                scrollToFirstStep={true}
                scrollOffset={100}
                spotlightClicks={true}
                disableOverlayClose={false}
                styles={{
                    options: {
                        primaryColor: '#7c3aed',
                        textColor: '#333',
                        backgroundColor: '#fff',
                        overlayColor: 'rgba(0, 0, 0, 0.4)',
                        zIndex: 10000,
                    },
                    tooltip: {
                        borderRadius: 8,
                        fontSize: 14,
                    },
                    buttonNext: {
                        backgroundColor: '#7c3aed',
                        borderRadius: 6,
                        padding: '8px 16px',
                    },
                    buttonBack: {
                        color: '#666',
                        marginRight: 10,
                    },
                    buttonSkip: {
                        color: '#999',
                    },
                }}
                locale={{
                    back: 'Back',
                    close: 'Close',
                    last: 'Finish',
                    next: 'Next',
                    skip: 'Skip Tour'
                }}
            />
        </>
    )
}

export default ProductTour