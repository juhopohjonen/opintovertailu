import { Helmet } from "react-helmet"

const SeoEnchanger = ({ title, desc }) => {
    if (!title && !desc) {
        return null
    }

    return (
        <Helmet>
            {
                title ? <title>{title} - Opintovertailu</title> : <title>Opintovertailu</title>
            }

            {
                desc ? <meta name="description" content={desc} /> : null
            }
        </Helmet>
    )
}

export default SeoEnchanger