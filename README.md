# Learning.NodeJSWithTypescript
For learning typescript, this project describes the application, at  Orders for syatem OderApp.

Patterns and Principles in this project:

- Generic Repository Pattern
- Singleton Pattern
- Multi-layer Architecture Pattern

Tools:
- NodeJS
- TypeScript
- ExpressJS
- MongoDB
- Mongoose
- GulpJS
- VSCode Task Runners

Convention Refs: <br />
   <a href="https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines" target="_blank"> Coding guidelines Typescript - Microsoft</a> 

Run:
   <br><code>  > npm install </code>
    
   if not executing from VSCode: 
   <br><code> > gulp </code>

<h2> REST API Definitions: </h2>


CREATE <br />
   <code> > METHOD: POST </code> <br />
   <code> > PARAMS: {"name":"toliet paper","qty":120,"amount":111} </code> <br />
   <code> > URL: http://localhost:5000/orders </code> <br />
   <code> > RETURN: success or error </code> <br />
<br />

RETRIEVE <br />
   <code> > METHOD: GET </code> <br />
   <code> > URL: http://localhost:5000/orders/ </code> <br />
   <code> > RETURN: [{"name":"toliet paper","qty":120,"amount":111}]</code> <br />
<br />

GET ONE <br />
   <code> > METHOD: GET </code> <br />
   <code> > URL: http://localhost:5000/orders/56800b6b01c67c194e603e23 </code> <br />
   <code> > RETURN: {"name":"toliet paper","qty":120,"amount":111} </code> <br />
   <code> > OBSERVATIONS: for this request, use item id in url (56800b6b01c67c194e603e23) </code>
<br />

UPDATE <br />
   <code> > METHOD: PUT </code> <br />
   <code> > PARAMS: {"name":"toliet paper","qty":120,"amount":999} </code> <br />
   <code> > URL: http://localhost:5000/orders/56800afbf34739a94da174f0 </code> <br />
   <code> > RETURN: success or error </code> <br />
   <code> > OBSERVATIONS: for this request, use item id in url (56800afbf34739a94da174f0) </code>
<br />

DELETE <br />
   <code> > METHOD: DELETE </code> <br />
   <code> > URL: http://localhost:5000/orders/56800afbf34739a94da174f0 </code> <br />
   <code> > RETURN: success or error </code> <br />
<br />







