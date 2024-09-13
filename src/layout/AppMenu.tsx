/* eslint-disable @next/next/no-img-element */

import React, { useContext } from "react";
import AppMenuitem from "./AppMenuitem";
import { LayoutContext } from "./context/layoutcontext";
import { MenuProvider } from "./context/menucontext";
import Link from "next/link";
import { AppMenuItem } from "../../types/types";

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
        {
            label: "Home",
            items: [{ label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" }],
        },
        {
            label: "Demo",
            items: [
                {
                    label: "CRUD Table",
                    icon: "pi pi-fw pi-bookmark",
                    to: "/demo/crud",
                },
                {
                    label: "Drawio",
                    icon: "pi pi-fw pi-bookmark",
                    to: "/demo/drawio",
                },
                {
                    label: "ReactFlow",
                    icon: "pi pi-fw pi-bookmark",
                    to: "/demo/reactflow",
                },
                {
                    label: "ReactFlow2",
                    icon: "pi pi-fw pi-bookmark",
                    to: "/demo/reactflow2",
                },
            ],
        },
        {
            label: "공정상세관리",
            items: [
                {
                    label: "분석",
                    icon: "pi pi-fw pi-bookmark",
                    items: [
                        {
                            label: "요구사항관리",
                            icon: "pi pi-fw pi-bookmark",
                            to: "/sc/reqmgr",
                        },
                    ],
                },
                {
                    label: "설계",
                    icon: "pi pi-fw pi-bookmark",
                    items: [
                        {
                            label: "요구사항관리",
                            icon: "pi pi-fw pi-bookmark",
                            to: "/sc/desmgr",
                        },
                    ],
                },
                {
                    label: "개발",
                    icon: "pi pi-fw pi-bookmark",
                },
                {
                    label: "테스트",
                    icon: "pi pi-fw pi-bookmark",
                },
            ],
        },
        {
            label: "Tree",
            items: [
                {
                    label: "Submenu 1",
                    icon: "pi pi-fw pi-bookmark",
                    items: [
                        {
                            label: "Submenu 1.1",
                            icon: "pi pi-fw pi-bookmark",
                            items: [
                                { label: "Submenu 1.1.1", icon: "pi pi-fw pi-bookmark" },
                                { label: "Submenu 1.1.2", icon: "pi pi-fw pi-bookmark" },
                                { label: "Submenu 1.1.3", icon: "pi pi-fw pi-bookmark" },
                            ],
                        },
                        {
                            label: "Submenu 1.2",
                            icon: "pi pi-fw pi-bookmark",
                            items: [{ label: "Submenu 1.2.1", icon: "pi pi-fw pi-bookmark" }],
                        },
                    ],
                },
                {
                    label: "Submenu 2",
                    icon: "pi pi-fw pi-bookmark",
                    items: [
                        {
                            label: "Submenu 2.1",
                            icon: "pi pi-fw pi-bookmark",
                            items: [
                                { label: "Submenu 2.1.1", icon: "pi pi-fw pi-bookmark" },
                                { label: "Submenu 2.1.2", icon: "pi pi-fw pi-bookmark" },
                            ],
                        },
                        {
                            label: "Submenu 2.2",
                            icon: "pi pi-fw pi-bookmark",
                            items: [{ label: "Submenu 2.2.1", icon: "pi pi-fw pi-bookmark" }],
                        },
                    ],
                },
            ],
        },
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? (
                        <AppMenuitem item={item} root={true} index={i} key={item.label} />
                    ) : (
                        <li className="menu-separator"></li>
                    );
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
