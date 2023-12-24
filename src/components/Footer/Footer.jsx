import style from "./footer.module.scss";

const Footer = () => {
    return (
        <div className={style.footer} id={style.footer}>
            <p>Music provided by NCS (NoCopyrightSounds)</p>
            <a href="https://ncs.io/" className={style.link}>https://ncs.io/</a>
        </div>
    )
}

export default Footer;