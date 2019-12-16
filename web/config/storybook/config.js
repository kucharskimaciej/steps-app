/* eslint-disable import/no-extraneous-dependencies */
import { configure } from '@storybook/vue'
import '../../src/stories/index'

const req = require.context('../../src', true, /.stories.ts$/)

function loadStories() {
  console.log('======================>')
  req.keys().forEach(filename => {
    console.log(`LOADING ${filename}`)
    req(filename)
  })
}

configure(loadStories, module)
