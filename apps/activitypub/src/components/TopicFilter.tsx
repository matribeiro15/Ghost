import React from 'react';
import {Button} from '@tryghost/shade';

export type Topic = 'top' | 'featured' | 'news' | 'technology' | 'business' | 'culture' | 'politics' | 'finance' | 'design' | 'personal' | 'programming' | 'art' | 'travel' | 'education' | 'entertainment' | 'literature' | 'sport' | 'faith-spirituality' | 'productivity' | 'science' | 'crypto' | 'food-drink' | 'music' | 'nature-outdoors' | 'fashion-beauty' | 'climate' | 'parenting' | 'house-home' | 'fiction' | 'history' | 'gear-gadgets';

const TOPICS: {value: Topic; label: string}[] = [
    {value: 'top', label: 'Top'},
    {value: 'featured', label: 'Featured'},
    {value: 'news', label: 'News'},
    {value: 'technology', label: 'Technology'},
    {value: 'business', label: 'Business'},
    {value: 'culture', label: 'Culture'},
    {value: 'politics', label: 'Politics'},
    {value: 'finance', label: 'Finance'},
    {value: 'design', label: 'Design'},
    {value: 'personal', label: 'Personal'},
    {value: 'programming', label: 'Programming'},
    {value: 'art', label: 'Art'},
    {value: 'travel', label: 'Travel'},
    {value: 'education', label: 'Education'},
    {value: 'entertainment', label: 'Entertainment'},
    {value: 'literature', label: 'Literature'},
    {value: 'sport', label: 'Sport & fitness'},
    {value: 'faith-spirituality', label: 'Faith & spirituality'},
    {value: 'productivity', label: 'Productivity'},
    {value: 'science', label: 'Science'},
    {value: 'crypto', label: 'Crypto'},
    {value: 'food-drink', label: 'Food & drink'},
    {value: 'music', label: 'Music'},
    {value: 'nature-outdoors', label: 'Nature & outdoors'},
    {value: 'fashion-beauty', label: 'Fashion & beauty'},
    {value: 'climate', label: 'Climate'},
    {value: 'parenting', label: 'Parenting'},
    {value: 'house-home', label: 'House & home'},
    {value: 'fiction', label: 'Fiction'},
    {value: 'history', label: 'History'},
    {value: 'gear-gadgets', label: 'Gear & gadgets'}
];

interface TopicFilterProps {
    currentTopic: Topic;
    onTopicChange: (topic: Topic) => void;
}

const TopicFilter: React.FC<TopicFilterProps> = ({currentTopic, onTopicChange}) => {
    return (
        <div className="mt-4 flex gap-3 overflow-x-auto">
            {TOPICS.map(({value, label}) => (
                <Button
                    key={value}
                    variant={currentTopic === value ? 'default' : 'secondary'}
                    onClick={() => onTopicChange(value)}
                >
                    {label}
                </Button>
            ))}
        </div>
    );
};

export default TopicFilter;
