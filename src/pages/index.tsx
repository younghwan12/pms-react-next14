import Image from "next/image";
import { Inter } from "next/font/google";
import { DataTable } from "@/common/components";
import { Column } from "primereact/column";
import AppWrapper from "@/layout/AppWrapper";
import { Button } from "primereact/button";
import { MainContent } from "@/features/main/components";

export default function Home() {
    return (
        <AppWrapper>
            <MainContent />
        </AppWrapper>
    );
}
