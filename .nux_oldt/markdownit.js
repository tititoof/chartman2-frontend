import MarkdownIt from 'markdown-it'

const handlePlugin = (plugin) => plugin.default || plugin

export default ({}, inject) => {
  const md = new MarkdownIt('default', {"linkify":true,"breaks":true,"injected":true})

  md.use(handlePlugin(require('markdown-it-div')))

  md.use(handlePlugin(require('markdown-it-attrs')))

  md.use(handlePlugin(require('markdown-it-highlightjs')))

  inject('md', md)
}