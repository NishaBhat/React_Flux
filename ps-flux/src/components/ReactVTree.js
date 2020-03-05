import React from "react"
import {FixedSizeTree as Tree} from 'react-vtree';
 
// Tree component can work with any possible tree structure because it uses an
// iterator function that the user provides. Structure, approach, and iterator
// function below is just one of many possible variants.
const tree = {
  name: 'Root #1',
  id: 'root-1',
  children: [
    {
      children: [
        {id: 'child-2', name: 'Child #2'},
        {id: 'child-3', name: 'Child #3'},
      ],
      id: 'child-1',
      name: 'Child #1',
    },
    {
      children: [{id: 'child-5', name: 'Child #5'}],
      id: 'child-4',
      name: 'Child #4',
    },
  ],
};
 
function* treeWalker(refresh) {
  const stack = [];
 
  // Remember all the necessary data of the first node in the stack.
  stack.push({
    nestingLevel: 0,
    node: tree,
  });
 
  // Walk through the tree until we have no nodes available.
  while (stack.length !== 0) {
    /*const {
      node: {children, id, name},
      nestingLevel,
    } = stack.pop();*/
    const val = stack.pop ();
    const node = val.node;
    const nestingLevel = val.nestingLevel;
    const children = node.children;
    const id = node.id;
    const name = node.name;
 
    // Here we are sending the information about the node to the Tree component
    // and receive an information about the openness state from it. The
    // `refresh` parameter tells us if the full update of the tree is requested;
    // basing on it we decide to return the full node data or only the node
    // id to update the nodes order.
    const isOpened = yield refresh
      ? {
          id,
          isLeaf: children.length === 0,
          isOpenByDefault: true,
          name,
          nestingLevel,
        }
      : id;
 
    // Basing on the node openness state we are deciding if we need to render
    // the child nodes (if they exist).
    if (node.children.length !== 0 && isOpened) {
      // Since it is a stack structure, we need to put nodes we want to render
      // first to the end of the stack.
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push({
          nestingLevel: nestingLevel + 1,
          node: node.children[i],
        });
      }
    }
  }
}
 
// Node component receives all the data we created in the `treeWalker` +
// internal openness state (`isOpen`), function to change internal openness
// state (`toggle`) and `style` parameter that should be added to the root div.
const Node = ({data: {isLeaf, name}, isOpen, style, toggle}) => (
  <div style={style}>
    {!isLeaf && (
      <button type="button" onClick={toggle}>
        {isOpen ? '-' : '+'}
      </button>
    )}
    <div>{name}</div>
  </div>
);
 
const Example = () => (
  <Tree treeWalker={treeWalker} itemSize={30} height={150} width={300}>
    {Node}
  </Tree>
);

export default Example;