import { Button, makeStyles } from "@material-ui/core"
import { useEthers } from "@usedapp/core"

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(4),
        display: "flex",
        justifyContent: "flex-end",
        gap: theme.spacing(1)
    },
}))

export const Header = () => {
    const classes = useStyles()

    const { account, activateBrowserWallet, deactivate } = useEthers()

    const isConnected = account !== undefined
    const isSignedIn = account !== undefined

    return (
      <div >
        <div className={classes.container}>
            {isConnected ? (
                <Button variant="contained" onClick={deactivate}>
                    Disconnect
                </Button>
            ) : (
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => activateBrowserWallet()}
                >
                    Connect
                </Button>
            )}
        </div>
        <div className={classes.container}>
            {isSignedIn ? (
                <Button variant="contained" onClick={deactivate}>
                    Sign Off
                </Button>
            ) : (
                <Button
                    backgroundColor= 'yellow'
                    color = 'black'
                    variant="contained"
                    onClick={() => activateBrowserWallet()}
                >
                    Sign In
                </Button>
            )}
        </div>
      </div>
    )
}
