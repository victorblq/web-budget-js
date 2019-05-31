import {PersistentEntity} from "../PersistentEntity";
import { Column, Entity } from "typeorm";
import { ThemeType } from "./ThemeType";
import { DefaultSchemas } from "../../infrastructure/DefaultSchemas";

/**
 * The {@link User} profile, this class hold the individual {@link User} preferences
 *
 * @author Victor Carvalho
 *
 * @version 1.0.0
 * @since 1.0.0, 30/05/2019
 */
@Entity({name: "profiles", schema: DefaultSchemas.CONFIGURATION})
export class Profile extends PersistentEntity {

    @Column({name: "active_theme", nullable: false, enum: ThemeType})
    activeTheme: ThemeType;
    @Column({name: "dark_sidebar", nullable: false})
    useDarkSidebar: boolean;
    @Column({name: "show_wallet_balances", nullable: false})
    showWalletBalances: boolean;

}