import Bullet from '../../assets/images/about/bullet.png';
import { useState } from 'react';
import './AccordionContentBlock.css';

function AccordionContentBlock(){

    

    const [activeItem, setActiveItem] = useState('accordion_item_1');
    const AccordionItems = [

        {
            id: 'accordion_item_1',
            title: 'What is Neutralite Face Cream?',
            description: 'Neutralite Face Cream is a lightweight, hydrating moisturizer formulated to nourish, protect, and even out skin tone. It’s suitable for all skin types.'
        },
        {
            id: 'accordion_item_2',
            title: 'How do I use the face cream?',
            description: 'Neutralite Face Cream is a lightweight, hydrating moisturizer formulated to nourish, protect, and even out skin tone. It’s suitable for all skin types.'
        },
        {
            id: 'accordion_item_3',
            title: 'Is it suitable for sensitive skin?',
            description: 'Neutralite Face Cream is a lightweight, hydrating moisturizer formulated to nourish, protect, and even out skin tone. It’s suitable for all skin types.'
        },
        {
            id: 'accordion_item_4',
            title: 'Can I use it under makeup?',
            description: 'Neutralite Face Cream is a lightweight, hydrating moisturizer formulated to nourish, protect, and even out skin tone. It’s suitable for all skin types.'
        },
        {
            id: 'accordion_item_5',
            title: 'Is Neutralite cruelty-free?',
            description: 'Neutralite Face Cream is a lightweight, hydrating moisturizer formulated to nourish, protect, and even out skin tone. It’s suitable for all skin types.'
        },
    ]

    const toggleAccordion = (id) => {
        setActiveItem((prev) => (prev === id ? null : id));
    };

    return(
        <>
            <div className="accordion_wrapper mt-10">
                {AccordionItems.map((AccordionItem) => (
                    <div key={AccordionItem.id} className={`accordion_item ${activeItem === AccordionItem.id ? 'active' : ''}`} onClick={() => toggleAccordion(AccordionItem.id)}>
                        <div className="accordion_header px-5 py-3 ">
                            <h4 className='text-[20px] flex items-center justify-start'><span className="icon_wrapper w-[12px] mr-3"><img className='w-full' src={Bullet} alt="Bullet" /></span><span className="text_wrapper">{AccordionItem.title}</span> <span className='icon_wrapper ml-auto'><i className="fi fi-rs-angle-small-down flex"></i></span></h4>
                        </div>
                        <div className='accordion_description bg-white'>
                            <p className='text-[15px] font-roboto text-gray  p-5'>{AccordionItem.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default AccordionContentBlock;