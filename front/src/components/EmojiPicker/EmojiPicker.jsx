import React, { useState, useEffect } from 'react'
import "./EmojiPicker.scss"
import twemoji from 'twemoji';
import { getEmojis } from 'unicode-emoji';
import Tabs from '../Tabs/Tabs';
import Tab from '../Tabs/Tab';
import Searchbar from "../Searchbar/Searchbar"
import { Airplane, At, CupHot, CupStraw, EmojiSmile, Flag, Hypnotize, People, Tree, Umbrella } from 'react-bootstrap-icons';

const EmojiPicker = () => {
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [emojisByCategory, setEmojisByCategory] = useState({});

    const handleEmojiClick = (emoji) => {
        setSelectedEmoji(emoji.emoji);
    };

    useEffect(() => {
        const emojisData = getEmojis();

        // Organisez les emojis par catégorie
        const emojisGrouped = emojisData.reduce((accumulator, emoji) => {
            const category = emoji.category || 'Autre'; // Catégorie par défaut
            if (!accumulator[category]) {
                accumulator[category] = [];
            }
            accumulator[category].push(emoji);
            return accumulator;
        }, {});

        setEmojisByCategory(emojisGrouped);
    }, []);

    return (
        <div>
            <div className="p-10" style={{paddingBottom:8}}><Searchbar /></div>
            <Tabs className='emojis-picker-tabs'>
                {Object.keys(emojisByCategory).map((category,i) => {
                    let categoryIcon
                    switch (category) {
                        case 'face-emotion':
                            categoryIcon = <EmojiSmile size={20}/>
                            break;
                        case 'symbols':
                            categoryIcon = <At size={23}/>
                            break;
                        case 'person-people':
                            categoryIcon = <People size={20}/>
                            break;
                        case 'animals-nature':
                            categoryIcon = <Tree size={20}/>
                            break;
                        case 'food-drink':
                            categoryIcon = <CupStraw size={20}/>
                            break;
                        case 'travel-places':
                            categoryIcon = <Airplane size={20}/>
                            break;
                        case 'objects':
                            categoryIcon = <Umbrella size={20}/>
                            break;
                        case 'activities-events':
                            categoryIcon = <Hypnotize size={20}/>
                            break;
                        case 'flags':
                            categoryIcon = <Flag size={18}/>
                            break;
                        default:
                            categoryIcon = category
                            break;
                    }

                    return <Tab key={i} title={categoryIcon}>
                        <div className="cat-emojis">
                            {emojisByCategory[category].map((emoji) => (
                                
                                <span
                                    key={emoji.emoji}
                                    role="img"
                                    aria-label={emoji.description}

                                    className="emoji-btn"
                                >
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: twemoji.parse(emoji.emoji, {
                                                folder: 'svg',
                                                ext: '.svg',
                                                size: 30
                                            }),
                                        }}
                                    />
                                </span>
                            ))}
                        </div>
                    </Tab>
                })}
            </Tabs>


        </div>
    );
}

export default EmojiPicker
