import { Button, Text } from "@mantine/core";
import { openConfirmationModal } from "../../modal/ConfirmationModal";
import { openModal } from "@mantine/modals";
import { FeaturedComposition } from "../../../FeaturedComposition";
import { IconExternalLink } from "@tabler/icons";

export function openComposerModal(
  UID: string | undefined,
  fullName: string,
  awards: Array<FeaturedComposition> | undefined
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
          <div>
            {song.title}, awards: {song.awards}
            <br />
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

  const filled = createTable();
  const createChildren = () => {
    return (
      <div>
        <p>Composer: {fullName}</p>
        <br />
        {filled}
      </div>
    );
  };

  const title = "Composer Information";
  const confirmLabel = "Close";
  const cancelLabel = "";
  const color = "blue";
  const children = createChildren();

  //   openConfirmationModal({
  //     title,
  //     children,
  //     confirmLabel,
  //     cancelLabel,
  //     color,
  //     handleOnConfirm,
  //   });
  openModal({ title, children, color, closeButtonLabel: "Close" });
}
