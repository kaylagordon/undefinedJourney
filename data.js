const words = [
  "API",
  "CORS",
  "type coercion",
  "array",
  "object",
  "function",
  "string",
  "number",
  "boolean",
  "undefined",
  "null",
  "OOP",
  "wireframe",
  "TDD",
  "CI/CD",
  "progressive enhancement",
  "graceful degradation",
  "MVC",
  "responsive design",
  "pseudocode",
  "Ajax",
  "event propagation",
  "hoisting",
  "asynchronous code",
  "single threaded language",
  "Promises",
  "event listener",
  "HTML",
  "React",
  "JS",
  "CSS",
  "semantic HTML",
  "event loop",
  "Document Object Model (DOM)",
  "data model",
  "state",
  "props",
  "component",
  "virtual DOM",
  "npm",
  "package",
  "library",
  "framework",
  "global state management",
  "JSX",
  "conditional",
  "variable",
  "iterate",
  "callback function",
  "anonymous function",
];

const definitions = [
  { word:	"API",	definition:	"a connection between computers or between computer programs" },
  { word:	"CORS",	definition:	"a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served" },
  { word:	"type coercion",	definition:	"the automatic or implicit conversion of values from one data type to another (such as strings to numbers)" },
  { word:	"array",	definition:	"is an ordered list of values" },
  { word:	"object",	definition:	"an unordered collection of key-value pairs" },
  { word:	"function",	definition:	"a block of code that performs a specific task and you can execute it as many times as you want" },
  { word:	"string",	definition:	"a sequence of one or more characters that may consist of letters, numbers, or symbols, surrounded by quotation marks" },
  { word:	"number",	definition:	"a primitive data type used for positive or negative integer, float, binary, octal, hexadecimal, and exponential values" },
  { word:	"boolean",	definition:	"a data type that can have a value of true or false" },
  { word:	"undefined",	definition:	"indicates that a variable has not been assigned a value, or not declared at all" },
  { word:	"null",	definition:	"a keyword in JavaScript that signifies 'no value' or nonexistence of any value" },
  { word:	"OOP",	definition:	"a computer programming model that organizes software design around data, or objects, rather than functions and logic" },
  { word:	"wireframe",	definition:	"a two-dimensional illustration of a page's interface that specifically focuses on space allocation and prioritization of content, functionalities available, and intended behaviors" },
  { word:	"TDD",	definition:	"a software development process relying on software requirements being converted to test cases before software is fully developed" },
  { word:	"CI/CD",	definition:	"bridges the gaps between development and operation activities and teams by enforcing automation in building, testing and deployment of applications" },
  { word:	"progressive enhancement",	definition:	"a strategy in web design that puts emphasis on web content first, allowing everyone to access the basic content and functionality of a web page, whilst users with additional browser features or faster Internet access receive the enhanced version instead" },
  { word:	"graceful degradation",	definition:	"a design philosophy that centers around trying to build a modern web site/application that will work in the newest browsers, but falls back to an experience that while not as good still delivers essential content and functionality in older browsers" },
  { word:	"MVC",	definition:	"a pattern in software design commonly used to implement user interfaces, data, and controlling logic by emphasizing a separation between the software's business logic and display" },
  { word:	"responsive design",	definition:	"an approach to web design that aims to make web pages render well on a variety of devices and window or screen sizes" },
  { word:	"pseudocode",	definition:	"a plain language description of the steps in an algorithm or another system" },
  { word:	"Ajax",	definition:	"a set of web development techniques that uses various web technologies on the client-side to create asynchronous web applications" },
  { word:	"event propogation",	definition:	"the order in which different DOM elements are notified of an event" },
  { word:	"hoisting",	definition:	"the process of implicitly moving the declaration of variables and functions to the top of their scope" },
  { word:	"asynchronous code",	definition:	"lets you execute a block of code without stopping (or blocking) the entire thread where the action is being executed" },
  { word:	"single threaded language",	definition:	"is a language with a single call stack and a single memory heap that runs only one thing at a time" },
  { word:	"Promises",	definition:	"represents an operation that hasn't completed yet" },
  { word:	"event listener",	definition:	"is a method that exists on a DOM element that listens for an event and then invokes a function" },
  { word:	"HTML",	definition:	"the code that is used to structure a web page and its content" },
  { word:	"React",	definition:	" a free and open-source front-end JavaScript library for building user interfaces based on UI components, created by Facebook" },
  { word:	"JS",	definition:	"is a programming language that is one of the core technologies of the World Wide Web that defines behavior" },
  { word:	"CSS",	definition:	"a style sheet language used for describing the presentation of a document" },
  { word:	"semantic HTML",	definition:	"the use of HTML markup to reinforce the meaning of the information in web pages and web applications rather than merely to define its presentation or look" },
  { word:	"event loop",	definition:	" a constantly running process that monitors both the callback queue and the call stack" },
  { word:	"Document Object Model (DOM)",	definition:	"a programming API for HTML and XML documents that defines the logical structure of documents and the way a document is accessed and manipulated" },
  { word:	"data model",	definition:	"the source of truth for the data used in your application" },
  { word:	"state",	definition:	"a built-in React object that is used to contain data about the component" },
  { word:	"props",	definition:	"are read-only arguments passed into React components" },
  { word:	"component",	definition:	"independent and reusable bits of code used in React to define a piece of the UI" },
  { word:	"virtual DOM",	definition:	"a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM" },
  { word:	"npm",	definition:	"a package manager for the JavaScript programming language" },
  { word:	"package",	definition:	"is a unit of distribution that can contain a library or an executable or both" },
  { word:	"library",	definition:	"a set of modules which makes sense to be together and that can be used in a program" },
  { word:	"framework",	definition:	"a tool that provides ready-made components or solutions that are customized in order to speed up development" },
  { word:	"global state managment ",	definition:	"data is shared between all the components within a React application" },
  { word:	"JSX",	definition:	"allows us to write HTML in React" },
  { word:	"conditional",	definition:	"used to perform different actions based on different conditions" },
  { word:	"variable",	definition:	"are containers for storing values" },
  { word:	"iterate",	definition:	"to perform repetitive tasks to every element in a dataset" },
  { word:	"callback function",	definition:	"is a function passed into another function as an argument" },
  { word:	"anonymous function",	definition:	"is an unnamed function" }
];
