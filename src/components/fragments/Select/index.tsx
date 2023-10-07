import clsx from "clsx";
import styles from "./select.module.css"

type selectType = {
    name: string;
    id: string;
    className? : string;
    children: React.ReactNode;
    label: string;
}

const SelectInput = (props: selectType) => {
    const {name, id, children, className, label} = props
    return (
        <div className={clsx(styles.selectBox, className)}>
            <label htmlFor={id} className={styles.label}>{label}</label>
            <select className={styles.selectField} name={name} id={id}>{children}</select>
        </div>
    )
}

export default SelectInput