import createMuiTheme, {Theme, ThemeOptions} from "@material-ui/core/styles/createMuiTheme";
import {green} from "@material-ui/core/colors";
import {Color} from "@material-ui/core";

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        customPalette: {
            success: Color
        }
    }

    interface ThemeOptions {
        customPalette?: {
            success?: Color
        }
    }
}

export function createTheme(options: ThemeOptions): Theme {
    return createMuiTheme({
        customPalette:{
            success: green
        },
        ...options
    });
}