import type { ClassKey } from "keycloakify/login";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "keycloakify/login/Template";
import { Suspense, lazy } from "react";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import "./main.css";
const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;
    const overwrittenContext = {
        ...kcContext,
        url: {
            ...kcContext.url,
            loginResetCredentialsUrl: "/forgot-password"
        }
    } as KcContext;

    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    default:
                        return (
                            <DefaultPage
                                kcContext={overwrittenContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

const classes = {
    kcHtmlClass: "html",
    kcLocaleMainClass: "hide",
    kcSignUpClass: "hide",
    kcHeaderWrapperClass: "hideChildDiv logo",
    kcFormCardClass: "card",
    kcButtonClass: "button"
} satisfies { [key in ClassKey]?: string };
