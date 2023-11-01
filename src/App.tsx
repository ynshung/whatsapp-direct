import { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { CountryCode } from "libphonenumber-js/core";
import type { E164Number } from "libphonenumber-js";
import { BsBoxArrowUpRight, BsClipboard, BsShare } from "react-icons/bs";
import ThemeToggle from "./ThemeToggle";

function App() {
    const [value, setValue] = useState<E164Number>(); // changed initial state value to a valid E164Number
    const [message, setMessage] = useState<string>();

    const [countryCode, setCountryCode] = useState<CountryCode>();

    const getURL = () => {
        return `https://api.whatsapp.com/send?phone=${value?.substring(1)}${
            message ? `&text=${message}` : ""
        }`;
    };

    useEffect(() => {
        fetch("https://api.country.is/").then((res) => {
            res.json().then((data) => {
                setCountryCode(data.country);
            });
        });
    }, []);

    return (
        <>
            <div className="h-screen flex justify-center items-center">
                <div className="p-6 w-full mx-auto flex flex-col gap-6 items-center">
                    <div>
                        <img
                            src="/icon.png"
                            alt="Icon"
                            className="mx-auto"
                            width={64}
                            height={64}
                        />
                        <h1 className="font-bold text-xl text-center mb-1">
                            WhatsApp Direct
                        </h1>
                        <p className="text-sm text-center max-w-xs">
                            Send WhatsApp message without having to save the
                            number or get a prefilled message link.
                        </p>
                    </div>
                    <PhoneInput
                        international
                        defaultCountry={countryCode}
                        placeholder="Enter phone number"
                        value={value}
                        onChange={setValue}
                        className="input input-bordered w-full max-w-[256px]"
                    />

                    <textarea
                        className="textarea textarea-bordered w-full max-w-sm"
                        placeholder="Enter message"
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <div className="flex flex-wrap justify-center items-center gap-4">
                        <a
                            href={getURL()}
                            target="_blank"
                            className="btn btn-circle btn-ghost dark:bg-neutral-900 shadow-lg hover:bg-green-300 dark:hover:bg-green-600"
                            title="Open link"
                        >
                            <BsBoxArrowUpRight className="dark:fill-neutral-50" />
                        </a>
                        <button
                            className="btn btn-circle btn-ghost dark:bg-neutral-900 shadow-lg hover:bg-green-300 dark:hover:bg-green-600"
                            onClick={() => {
                                navigator.clipboard.writeText(getURL());
                            }}
                            title="Copy link to clipboard"
                        >
                            <BsClipboard className="dark:fill-neutral-50" />
                        </button>
                        <button
                            className="btn btn-circle btn-ghost dark:bg-neutral-900 shadow-lg hover:bg-green-300 dark:hover:bg-green-600"
                            onClick={() => {
                                navigator.share({
                                    url: getURL(),
                                });
                            }}
                            title="Share link"
                        >
                            <BsShare className="dark:fill-neutral-50" />
                        </button>
                    </div>
                    <p className="text-xs text-center leading-normal">
                        <hr className="w-screen max-w-xs mb-3 dark:border-neutral-600" />
                        Created by&nbsp;
                        <a
                            href="https://ynshung.com"
                            target="_blank"
                            className="font-bold hover:text-green-600 transition"
                        >
                            Young Shung
                        </a>
                        &nbsp;• MIT License at&nbsp;
                        <a
                            href="https://github.com/ynshung/whatsapp-direct"
                            target="_blank"
                            className="font-bold hover:text-green-600 transition"
                        >
                            GitHub
                        </a>
                    </p>
                </div>
            </div>
            <ThemeToggle />
        </>
    );
}

export default App;
