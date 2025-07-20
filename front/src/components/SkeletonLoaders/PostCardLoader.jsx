import React from "react"
import ContentLoader from "react-content-loader"

const PostCardLoader = (props) => (
    <div className="elevated-card p-10" style={{marginBottom:20,width:'100% !important'}}>
        <ContentLoader
            speed={2}
            width="100%"
            viewBox="0 0 700 480"
            backgroundColor="#dad8e8"
            foregroundColor="#f9ebd5"
            {...props}
        >
            <rect x="62" y="8" rx="0" ry="0" width="88" height="6" />
            <rect x="62" y="26" rx="0" ry="0" width="52" height="6" />
            <rect x="0" y="62" rx="0" ry="0" width="90" height="6" />
            <rect x="100" y="62" rx="0" ry="0" width="150" height="6" />
            <rect x="0" y="80" rx="0" ry="0" width="178" height="6" />
            <circle cx="26" cy="26" r="26" />
            <rect x="0" y="97" rx="0" ry="0" width="100%" height="350" />
            <rect x="0" y="460" rx="0" ry="0" width="88" height="21" />
            <rect x="99" y="460" rx="0" ry="0" width="88" height="21" />
            <rect x="197" y="460" rx="0" ry="0" width="88" height="21" />
            <rect x="calc(100% - 35px)" y="0" rx="0" ry="0" width="35" height="35" />
        </ContentLoader>
    </div>
)

export default PostCardLoader