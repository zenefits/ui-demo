Component that opens up a chat window with Salesforce's LiveAgent chat.

While you can connect to implementation and support queues, the chat functionality currently does not support case creation.

Note: If you need to create a new queue, you need to coordinate with the Salesforce team as Live agent chat is very tied into salesforce.

#### Examples

```jsx noeditor
<StorybookExample selectedKind="chat|LiveAgentChat" selectedStory="implementation" height="200px" />
```

**More Examples - Screenshots/Gifs**

LiveAgent example:
<br /><img src="./images/Live-agent-chat-example-not-online.gif"  width="600"> <br />
No agents are online :
<br /> <img src="./images/Live-agent-chat-example.gif"  width="600" ><br />
Timeout warning banner :
<br /><img src="./images/Live-agent-timeout-warning-banner.png"  width="200"><br />

#### Usage

- Someone on the Salesforce agent side must be online for chats or accept the chat request in order for the chat UI to appear
- If no one is available, a message in the chat window will appear with an option to email the appropriate queue

Note: The support queues (hr, payroll, insurance) will connect to the production Support chat queues, meaning you will talk to the actual Support team. The Implementation queue currently opens to the Salesforce QA sandbox on local and beta, and to production Implementation chat queue on production.
