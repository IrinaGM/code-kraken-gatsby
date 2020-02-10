import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogLink = styled(Link)`
  text-decoration: none;
`

const BlogTitle = styled.h3`
  margin-bottom: 20px;
  color: blue;
`

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" />
    <div>
      <h1> Recent Posts </h1>
      <h4>Total Posts: {data.allMarkdownRemark.totalCount}</h4>
      {
        data.allMarkdownRemark.edges.map(({node}) => (
          <div key={node.id}>
          <BlogLink to={node.fields.slug}>
            <BlogTitle>{node.frontmatter.title} - {node.frontmatter.date}</BlogTitle>
          </BlogLink>
            <p>{node.excerpt}</p>
          </div>
        ))
      }
    </div>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query {
  allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
    totalCount
    edges {
      node {
        id
        frontmatter {
          title
          description
          date(formatString: "MMMM Do YYYY")
        }
        fields{
          slug
        }
        html
        excerpt
      }
    }
  }
}
`