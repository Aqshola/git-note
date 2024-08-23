import { ElementObjectCssStyle } from "@/types/general";
import { Button, Divider, Flex, Row, Typography, theme as AntdTheme, Image, Grid } from "antd";


export default function Landing() {
    const { token } = AntdTheme.useToken()
    const breakpoint = Grid.useBreakpoint()

    const isBigScreen = breakpoint.lg || breakpoint.md || breakpoint.xl || breakpoint.xxl


    const STYLE = {
        wrapper: {
            height: "100vh",
        },
        container: {
            maxWidth: "1440px",
            margin: "auto"
        },

        header: {
            padding: token.paddingLG,
        },
        dividerHeaderButtons: {
            height: "100%"
        },
        buttonHeader: {
            backgroundColor: "rgba(0, 0, 0, 0.88)"
        },

        body: {
            marginTop: token.marginXL
        },

        titleBody: {
            fontSize: isBigScreen ? '75px' : '62px',
            textAlign: "center",
            fontWeight: "bolder",
        },

        paragraphBody: {
            textAlign: "center",
            fontSize: isBigScreen ? token.fontSizeXL : token.fontSizeLG
        },

        buttonBody: {
            width: 'fit-content',
            margin: "auto",
            marginTop: token.marginLG,
            backgroundColor: "rgba(0, 0, 0, 0.88)"
        },

        image: {
            objectFit: "contain",
            width: "100%",
            height: "100%"
        },

        wrapperImage: {
            marginTop: token.marginLG,
            height: isBigScreen ? "100%" : "400px",
            backgroundColor: "black"
        }




    } satisfies ElementObjectCssStyle
    return (
        <div style={STYLE.wrapper}>
            <Flex style={STYLE.container} vertical={true}>
                <header id="header" style={STYLE.header}>
                    <Flex justify="space-between">
                        <div>
                            <Typography.Title level={3}>Gitnote</Typography.Title>
                        </div>
                        <Flex>
                            <Button type="text">About</Button>
                            <Divider type="vertical" orientation="center" style={STYLE.dividerHeaderButtons} />
                            <Button type="primary" style={STYLE.buttonHeader}>Log In</Button>
                        </Flex>
                    </Flex>
                </header>
                <Flex id="body" style={STYLE.body} vertical={true}>
                    <Typography.Title level={4} style={STYLE.titleBody}>
                        The most Github way {isBigScreen ? (<br />) : <></>}  to store your notes
                    </Typography.Title>
                    <Typography style={STYLE.paragraphBody}>Sync and store all your notes into github, Install now for iOS, Android, Mac, Windows, Linux, or in your browser</Typography>
                    <Button style={STYLE.buttonBody} size="large" type="primary" color="black" >Sign Github</Button>
                </Flex>
                <Flex style={STYLE.wrapperImage}>
                    <img alt="github" src="/assets/images/github.jpg" style={STYLE.image} />
                </Flex>
            </Flex>


        </div>
    )


}