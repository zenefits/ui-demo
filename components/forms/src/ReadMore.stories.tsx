import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Flex, Heading, P } from 'zbase';

import ReadMore from './ReadMore';
import Link from './Link';

const defaultText =
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';

interface State {
  isExpanded: boolean;
}
class ReadMoreConsumer extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = { isExpanded: false };
  }

  expand = e => {
    this.setState({ isExpanded: true });
  };

  collapse = e => {
    this.setState({ isExpanded: false });
  };

  render() {
    return (
      <ReadMore
        lines={3}
        isExpanded={this.state.isExpanded ? this.state.isExpanded : undefined}
        expandControl={
          <Link onClick={this.expand} fontSize__deprecated__doNotUse={2}>
            ...More!
          </Link>
        }
        collapseControl={
          <Link onClick={this.collapse} fontSize__deprecated__doNotUse={2}>
            ...Less!
          </Link>
        }
        expandedText={
          <P color="negation.a" fontStyle="paragraphs.l">
            Expanded: But I mu&nbsp;&nbsp;st explain to <br />you how all this&nbsp;&nbsp;&nbsp;&nbsp; mistaken idea of
            denouncing pleasure a<br />nd praising pain was born and I will g<br />ive you a<br /> complete a<br />ccount
            of the system, and ex<br />pound the actual teachings of the
            gr&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;eat explorer of the truth, the master-builder of
            huma&nbsp;&nbsp;&nbsp;n happiness. No one rejects, dislike<br />s, or avoids pleas<br />ure its&nbsp;elf,
            because it is pleasu<br />re, but because those w<br />ho do not know how to pursue pleasure rat<br />ionally
            encounter consequen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ces that are extr<br />emely painful. Nor
            again is there anyone who<br /> loves or pursues or desires to obtain pain of it&nbsp;&nbsp;&nbsp;self,
            because &nbsp;&nbsp;&nbsp;it is pain, but because occa<br />sionally circumstances occur in which toil and
            pain can procure him some great pleasure. To ta<br />ke a trivial example, which of <br />us
            ev&nbsp;&nbsp;&nbsp;&nbsp;er undertakes laborious physical exercise, except<br /> to obtain some advantage
            from it? But who has any right to find<br /> fault with a man who chooses to enjoy a
            p&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leasure that has no
            a&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nnoying consequences, or one who avoids a pain tha<br />t produces no
            resultant pleasure?
          </P>
        }
        color="tertiary.a"
        fontStyle="paragraphs.l"
      >
        {defaultText}
      </ReadMore>
    );
  }
}

storiesOf('ReadMore', module)
  .addDecorator(getStory => <Flex p={20}>{getStory()}</Flex>)
  .add('Basic', () => (
    <Box ml={4} mt={4} w={1 / 2}>
      <Heading level={5}>Default</Heading>
      <ReadMore>{defaultText}</ReadMore>

      <Heading level={5} mt={3}>
        Specified lines to truncate collapsed text
      </Heading>
      <ReadMore lines={5}>{defaultText}</ReadMore>

      <Heading level={5} mt={3}>
        Hide expandControl on resize if the whole text fits
      </Heading>
      <ReadMore isExpandControlHiddenOnResize>
        expandControl will hide if you resize me to fit>>>>>>>>>>>>>>>>>>> if im showing all the way, the control should
        be hidden
      </ReadMore>

      <Heading level={5} mt={3}>
        Different Text, fontStyle, and color for expandedText
      </Heading>
      <ReadMore
        expandedText={
          <P color="affirmation.a" fontStyle="paragraphs.l">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
            atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
            sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum
            facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
            impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
            repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et
            voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus,
            ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat
          </P>
        }
      >
        {defaultText}
      </ReadMore>
      <Box>
        <Heading level={5} mt={3}>
          More Customizable: different fontStyles, colors, expandControl, collapseControl, number of lines, and
          expandedText which includes line breaks and spaces
        </Heading>
        <ReadMoreConsumer />
      </Box>
    </Box>
  ));
