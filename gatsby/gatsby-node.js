import { graphql } from 'gatsby';
import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  //  1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  data.pizzas.nodes.forEach(pizza => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        josh: 'is cool',
        slug: pizza.slug.current
      }
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. Get the template
  const toppingTemplate = path.resolve('./src/pages/pizzas.js')
  // 2. query all toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // 3. create page for topping
  data.toppings.nodes.forEach(topping => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
      }
    })
  });
  // 4. pass topping data to pizza.js
}

async function fetchBeersAndTurnIntoNodes ({ actions, createNodeId, createContentDigest }) {
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();
  for (const beer of beers) {
    const nodeContent = JSON.stringify(beer);
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      }
    };
    actions.createNode({
      ...beer,
      ...nodeMeta
    })
  }
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
  const slicemasterTemplate = path.resolve('./src/templates/Slicemaster.js');
  // Query all slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
          description
        }
      }
    }
  `);
  // turn each into own page
  data.slicemasters.nodes.forEach(slicemaster => {
    actions.createPage({
      path: `slicemaster/${slicemaster.slug.current}`,
      component: slicemasterTemplate,
      context: {
        slug: slicemaster.slug.current
      }
    });
  });
  // figure out how many pages there are
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  })
}

export async function sourceNodes(params) {
  await Promise.all([
    await fetchBeersAndTurnIntoNodes(params),
  ]);
}

export async function createPages(params) {
  // Create pages dynamically
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
  // 1. Pizzas
  // 2. Toppings
  // 3. Slicemasters
}