
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'
import MuiToggleButton from '@mui/material/ToggleButton'

export const StyledButton = styled(Button)(({ theme, color = 'primary' }) => ({
    color: 'white',
    backgroundColor: theme.palette[color].main,
    fontWeight: 500,
    textTransform: 'none',
    borderRadius: '4px',
    '&:hover': {
        backgroundColor: theme.palette[color].dark,
        backgroundImage: 'none'
    }
}))

export const StyledToggleButton = styled(MuiToggleButton)(({ theme, color = 'primary' }) => ({
    '&.Mui-selected, &.Mui-selected:hover': {
        color: 'white',
        backgroundColor: theme.palette[color].main,
        fontWeight: 500
    }
}))
