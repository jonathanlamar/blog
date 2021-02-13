import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ContactForm from "../components/contact-form"
import style from "./contact.module.less"

function Contact() {
  return (
    <Layout>
      <SEO title="Contact" keywords={["jonalarm"]} />
      <h1 style={{ textAlign: "center" }}>Contact</h1>
      <div className={style.container}>
        <ContactForm action="https://www.flexyform.com/f/37a7cc37428cb5c70aef9a04aff51535e35268fc "></ContactForm>
      </div>
    </Layout>
  )
}

export default Contact
