import { useEffect, useState } from "react";
import { TabsProps } from "../../../Models/ComponentProps/TabsProps"
import Tab from "../Tab/Tab";

function Tabs(props: TabsProps) {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <div className="tabs-container">
            {props.children && props.children.length > 0 && props.children.map((child, index) => (
                <Tab
                    key={index}
                    isActive={index === activeIndex}
                    title={child.props.title}
                    onClick={() => {
                        child.props.onClick();
                        setActiveIndex(index);
                    }}
                >
                </Tab>
            ))}
        </div>
    )
}

export default Tabs