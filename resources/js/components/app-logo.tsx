import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="bg-white p-1.5 flex aspect-square size-9 items-center justify-center rounded-xl ">
                <AppLogoIcon className="size-5 fill-current text-amber-700 dark:text-black" />
            </div>
            {/* <div className="grid flex-1 text-left text-sm">
                <span className="m-3 truncate leading-none font-semibold text-3xl">boneke</span>
            </div> */}
        </>
    );
}
