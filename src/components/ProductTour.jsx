import React, { useState, useCallback } from 'react'
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@mui/material'
import { TourIcon } from '@tabler/icons-react'

const ProductTour = () => {
    const [run, setRun] = useState(false)
    const [stepIndex, setStepIndex] = useState(0)
    const navigate = useNavigate()
    const location = useLocation()

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
            content: 'Here you can see different assistant types like Custom, OpenAI, and Azure assistants.',
            placement: 'bottom',
            route: '/assistants'
        },
        {
            target: '[data-tour="add-assistant"]',
            content: 'Click the "+ Add" button to create a new assistant with your specific configuration.',
            placement: 'bottom',
        },

        // Step 4 - Marketplace
        {
            target: '[data-tour="marketplace-menu"]',
            content: 'The Marketplace contains pre-built templates you can use as starting points.',
            placement: 'right',
        },
        {
            target: '[data-tour="marketplace-cards"]',
            content: 'Browse through available templates. Click on any card to preview it.',
            placement: 'bottom',
            route: '/marketplaces'
        },
        {
            target: '[data-tour="use-template"]',
            content: 'Use the "Use Template" button to instantly create a chatflow from this template.',
            placement: 'bottom',
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
        {
            target: '[data-tour="how-to-use"]',
            content: 'Click "How to Use" to learn about variable usage in your workflows.',
            placement: 'bottom',
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
        {
            target: '[data-tour="import-keys"]',
            content: 'You can also import keys in bulk using the Import option with a JSON file.',
            placement: 'bottom',
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
                navigate(nextStep.route)
                // Small delay to allow route navigation
                setTimeout(() => {
                    setStepIndex(nextStepIndex)
                }, 100)
            } else {
                setStepIndex(nextStepIndex)
            }
        } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            setRun(false)
            setStepIndex(0)
        }
    }, [navigate, location.pathname, steps])

    const startTour = () => {
        setRun(true)
        setStepIndex(0)
        // Start from chatflows page
        if (location.pathname !== '/chatflows') {
            navigate('/chatflows')
        }
    }

    const stopTour = () => {
        setRun(false)
        setStepIndex(0)
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
                run={run}
                stepIndex={stepIndex}
                callback={handleJoyrideCallback}
                continuous={true}
                showProgress={true}
                showSkipButton={true}
                scrollToFirstStep={true}
                scrollOffset={100}
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