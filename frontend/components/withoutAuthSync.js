import React, { Component } from 'react'
import Router from "next/router"
import { auth } from "../util/auth"

const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component'

export const withAuthSync = WrappedComponent =>
  class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`

    static async getInitialProps (ctx) {
      const user = await auth(ctx)
      if (ctx.req && user) {
        ctx.res.writeHead(302, { Location: '/' })
        ctx.res.end()
        return
      }

      if (user) {
        Router.push('/')
      }

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx))

      return { ...componentProps, user }
    }

    render () {
      return <WrappedComponent {...this.props}/>
    }
}

export default withAuthSync