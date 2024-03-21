import { openConfirmationModal } from "../../modal/ConfirmationModal";
import { openModal } from "@mantine/modals";
import { FeaturedComposition } from "../../../FeaturedComposition";
import { IconExternalLink } from "@tabler/icons";
import {
  createStyles,
  Container,
  Title,
  Text,
  Image,
  Button,
  Badge,
} from "@mantine/core";
import MantineTheme from "@mantine/core";
export function openComposerModal(
  UID: string | undefined,
  fullName: string,
  awards: Array<FeaturedComposition> | undefined,
  bio: string | null,
  link: string | null,
  classes: any
) {
  const url = "https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday";
  function createTable() {
    if (awards != null && awards.length > 0) {
      // return (
      //   <div>
      //     <table>
      //       <thead>
      //         <th>Song Title</th>
      //         <th>Link</th>
      //         <th>Awards</th>
      //       </thead>
      //       <tbody>
      //         {awards.map((item) => {
      //           return (
      //             <tr key={item.title}>
      //               <td>{item.title}</td>
      //               <td>{item.link}</td>
      //               <td>{item.awards}</td>
      //             </tr>
      //           );
      //         })}
      //       </tbody>
      //     </table>
      //   </div>
      // );
      return awards.map((song) => {
        return (
          <div key={song.link}>
            <div>
              {song.awards ? (
                <p>
                  {song.title}, awards: {song.awards}
                </p>
              ) : (
                <div>{song.title}</div>
              )}
            </div>
            <a href={song.link} target="blank">
              <Button
                radius="md"
                sx={{
                  height: 30,
                  alignSelf: "flex-start",
                  margin: "15px 0px",
                }}
                size="md"
                rightIcon={<IconExternalLink style={{ marginLeft: "-5px" }} />}
              >
                Link
              </Button>
            </a>
          </div>
        );
      });
    } else return <div></div>;
  }

  const awardsSection = createTable();
  const createChildren = () => {
    return (
      <div>
        <Container>
          <div>
            {awards ? (
              <p className={classes.subheading}>
                Songs:
                <br />
              </p>
            ) : (
              <div />
            )}
            {awardsSection}
            <br />
            {bio ? (
              <div>
                <p className={classes.subheading}>
                  Biography: <br />
                </p>
                {bio}
              </div>
            ) : (
              <div />
            )}
            {link ? (
              <div>
                <p className={classes.subheading}>
                  Website link: <br />
                </p>
                <a href={link} target="blank">
                  <Button
                    radius="md"
                    sx={{
                      height: 30,
                      alignSelf: "flex-start",
                      margin: "15px 0px",
                    }}
                    size="md"
                    rightIcon={
                      <IconExternalLink style={{ marginLeft: "-5px" }} />
                    }
                  >
                    Composer Website
                  </Button>
                </a>
              </div>
            ) : (
              <div />
            )}
            <br />
          </div>
        </Container>
      </div>
    );
  };

  const title = fullName;
  const confirmLabel = "Close";
  const cancelLabel = "";
  const color = "blue";
  const children = createChildren();

  openModal({
    title,
    children,
    color,
    closeButtonLabel: "Close",
    size: "auto",
    classNames: { title: classes.modalTitle },
  });
}
