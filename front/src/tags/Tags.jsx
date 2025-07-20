import React from 'react';
import Parser from 'bbcode-to-react-components/lib/parser'
import Tag from 'bbcode-to-react-components/lib/tag'

let p=new Parser()

class Ul extends Tag {
    toReact() {
        
        // using this.getComponents() to get children components.
        return (
            <ul {...this.params}>{this.getComponents()}</ul>
        );
    }
}
class Ol extends Tag {
    toReact() {
        // using this.getComponents() to get children components.
        return (
            <ol {...this.params}>{this.getComponents()}</ol>
        );
    }
}
class Li extends Tag {
    toReact() {
        // using this.getComponents() to get children components.
        return (
            <li className={this.params.class}>{this.getComponents()}</li>
        );
    }
}

p.registerTag('ul', Ul); // add new tag
p.registerTag('ol', Ol);
p.registerTag('li', Li);

export default p;

