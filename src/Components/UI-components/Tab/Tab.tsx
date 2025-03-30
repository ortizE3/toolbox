
import { TabProps } from '../../../Models/ComponentProps/TabProps';

import './Tab.css'
function Tab(props: TabProps) {

    return (
        <button
            className={`tab-container ${props.isActive ? 'tab-container-active' : ''}`}
            onClick={
                props.onClick
            }
        >
            {props.title}
        </button>
    )
}

export default Tab