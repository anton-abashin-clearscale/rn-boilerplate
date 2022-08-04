### Fetch GraphQL types and update backend credentials

`amplify pull --appId [ID] --envName [STAGE]`

```text
Current Amplify application ID: d1wuoz62t4xvj0
Current Amplify environment: staging
```

### Libraries to take a picture

1) [react-native-image-picker](https://github.com/react-native-image-picker/react-native-image-picker)
- can get picture from media library
- no ability to customize camera screen

2) [react-native-vision-camera](https://github.com/mrousavy/react-native-vision-camera)
- can get only photo & video from camera
- can customize camera screen and native camera settings

### Code style guide

Basic rules
- Use functional components
- Use arrow functions
- Use parentheses when they span more than one line
- Never use `let` or `var` (`const` only)
- Never use `interface`. Use only `type`

```jsx
// ❌ bad
const Title = ({ text }) => <Text style={styles.title}>
{text}
</Text>

// ✅ good
const Title = ({ text }) => (
   <Text style={styles.title}>
      {text}   
   </Text>
)

// ❌ bad
<Foo superLongParam='bar'
     anotherSuperLongParam='baz' />

// ✅ good
<Foo
  superLongParam='bar'
  anotherSuperLongParam='baz'
/>

// ❌ bad
{showButton &&
  <Button />
}

// ❌ bad
{
  showButton &&
    <Button />
}

// ✅ good
{showButton && (
  <Button />
)}

// ✅ good
{showButton && <Button />}

// ✅ good
{someReallyLongConditional
  && anotherLongConditional
  && (
    <Foo
      superLongParam='bar'
      anotherSuperLongParam='baz'
    />
  )
}

// ✅ good
{someConditional ? (
  <Foo />
) : (
  <Foo
   superLongParam='bar'
   anotherSuperLongParam='baz'
  />
)}
```

### Naming conventions

Function name is always a verb or verb expression

```js
// ❌ bad
isNumber(2)

// ✅ good
getIsNumber(5)

// ✅ good
validateNumber(7)
```

Boolean must have prefix with: is, has, can, should e.t.c. (dont use adjectives like `hidden`, `removable`)

```js
// ❌ bad
const person = true
const age = true
const dance = true

// ✅ good
const isPerson = true
const hasAge = true
const canDance = true
```

The name should always be a representation of the data essence

```js
// ❌ bad
const phoneNumber = 'John Doe'

// ✅ good
const phoneNumber = '081299997777'
```

Use capitalize letters only for constants

```js
// ❌ bad
const AUTHORIZATION = useAuthVar()

// ✅ good
const LIMIT = 10
```

Hooks Naming

Hooks ALWAYS starts with `use` prefix

```js
// ❌ bad
const authorization = authVar()

// ✅ good
const authorization = useAuthVar()
```

`useState()` return value is an array. First element is a variable and second is a function setter which always start with `set` prefix

```js
// ❌ bad
const [isErrorModalShown, togleErrorModalShow] = useState(false)

// ✅ good
const [isErrorModalShown, setIsErrorModalShow] = useState(false)
```

`Stylesheet.create({})` return object with `styles` name. Param object has only camelCase keys. Style key should not contain `style` in the name.

```js
// ❌ bad
const myComponentStyles =  Stylesheet.create({
   submit_red_button_style: {
      width: '100%',
      backgroundColor: 'red'
   },
})

// ✅ good
const styles =  Stylesheet.create({
   submitRedButton: {
      width: '100%',
      backgroundColor: 'red'
   },
})
```
