import React from 'react'

const Layout = ({title,description,className,children}) => {
    return (
        <div className="mt-4">
            <div className="jumbotron">
                <h1 className="display-01">{title}</h1>
                <p className="lead">{description}</p>
            </div>
            <div className={className}>{children}</div>
        </div>
    )
}

export default Layout
