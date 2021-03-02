/** State Model - used in App module */
export interface InfoSystem {
    readonly title: string;
    readonly enable_delete_image: boolean;
    readonly registry_url: string;
}

/** State Model - used in App module */
export interface AppState {
    /** status visible - loading component */
    readonly username: string;

    readonly system: InfoSystem;

    /** status visible - loading component */
    readonly loading: boolean;
}
