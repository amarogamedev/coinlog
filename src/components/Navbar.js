import React from "react";
import { Stack } from "react-bootstrap";
import { BsCurrencyExchange, BsGear, BsCardList } from "react-icons/bs";
import CategoryService from "../api/CategoryService";
import AboutModal from "./modals/AboutModal";
import SettingsModal from "./modals/SettingsModal";

export default class Navbar extends React.Component {

    constructor() {
        super();
        this.categoryService = new CategoryService();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
                <div className="container-fluid">
                    <a className="navbar-brand me-4" href="/"><BsCurrencyExchange size={32} /> &nbsp;&nbsp;CoinLog</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <Stack direction="horizontal" gap={2}>
                            <AboutModal buttonContent={<><BsCardList size={24} /> &nbsp;&nbsp;&nbsp;About</>} />
                            <SettingsModal buttonContent={<><BsGear size={24} /> &nbsp;&nbsp;&nbsp;Settings</>} />
                        </Stack>
                    </div>
                </div>
            </nav>
        )
    }
}