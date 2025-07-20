import React from 'react'
import ContentLoader from 'react-content-loader'
const DiscussionLoader = (props) => {
    return (
        <div className='p-10'>
            <ContentLoader
                speed={2}
                height={350}
                backgroundColor="#dad8e8"
                foregroundColor="#f9ebd5"
                {...props}
            >
                /*-16 +9*/
                <circle cx="26" cy="24" r="24" />
                <rect x="60" y="8" rx="0" ry="0" width="88" height="6" />
                <rect x="60" y="33" rx="0" ry="0" width="50" height="6" />
                <circle cx="25" cy="95" r="24" />
                <rect x="60" y="79" rx="0" ry="0" width="60" height="6" />
                <rect x="60" y="104" rx="0" ry="0" width="88" height="6" />
                <circle cx="26" cy="166" r="24" />
                <rect x="60" y="150" rx="0" ry="0" width="100" height="6" />
                <rect x="60" y="175" rx="0" ry="0" width="48" height="6" />
                <circle cx="26" cy="237" r="24" />
                <rect x="60" y="221" rx="0" ry="0" width="80" height="6" />
                <rect x="60" y="246" rx="0" ry="0" width="88" height="6" />
                <circle cx="26" cy="308" r="24" />
                <rect x="60" y="292" rx="0" ry="0" width="60" height="6" />
                <rect x="60" y="318" rx="0" ry="0" width="120" height="6" />
                
            </ContentLoader>
        </div>
    )

}

export default DiscussionLoader
