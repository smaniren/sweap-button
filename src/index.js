import { TextControl, SelectControl, Flex, FlexBlock, FlexItem, button, icon } from "@wordpress/components"
import "./index.scss"
//Editor sperren, wenn nicht alle Felder befüllt sind
(function () {
    let locked = false
    //funktion, die bei jeder bearbeitung im Editor (egal welches Feld) feuert
    wp.data.subscribe(function () {
        // schaut, ob href link gesetzt wurde
        const results = wp.data.select('core/block-editor').getBlocks().filter(function (block) {
            return block.name == "sweap-button/sweap-button" && block.attributes.link == ""
        })

        if (results.length && locked == false) {
            locked = true
            wp.data.dispatch('core/editor').lockPostSaving('Link nicht hinterlegt')
        }

        if (!results.length && locked) {
            locked = false
            wp.data.dispatch('core/editor').unlockPostSaving('Link nicht hinterlegt')
        }

    })
})()


wp.blocks.registerBlockType("sweap-button/sweap-button", {
    title: "SWEAP-button",
    icon: "button",
    category: "common",
    attributes: {
        text: { type: "string" },
        link: { type: "string" },
        style: { type: "string" },
        icon: { type: "string" }
    },
    edit: EditComponent,
    save: function (props) {
        return null
    }
})

function EditComponent(props) { //components must have uppercase in first character

    function updateBtnText(value) {
        props.setAttributes({ text: value })
    }
    function updateBtnLink(value) {
        props.setAttributes({ link: value })

    }
    function updateBtnStyle(value) {
        props.setAttributes({ style: value })

    }
    function updateBtnIcon(value) {
        props.setAttributes({ icon: value })

    }
    return (
        <div className="btn">
            <Flex>
                <FlexItem>
                    <TextControl label="Text" value={props.attributes.text} onChange={updateBtnText} />

                </FlexItem>
                <FlexItem>
                    <TextControl label="Link" value={props.attributes.link} onChange={updateBtnLink} />

                </FlexItem>
                <FlexItem>
                    <SelectControl
                        label={('Select some users:')}
                        value={props.attributes.style} // e.g: value = [ 'a', 'c' ]
                        onChange={updateBtnStyle}
                        options={[
                            { value: 'btn', label: 'Default', disabled: false },
                            { value: 'btn btn--primary', label: 'primary' },
                            { value: 'btn btn--secondary', label: 'secondary' },
                            { value: 'btn btn--intext', label: 'intext' },
                        ]}
                        __nextHasNoMarginBottom
                    />

                </FlexItem>

            </Flex>
        </div>
    )
}