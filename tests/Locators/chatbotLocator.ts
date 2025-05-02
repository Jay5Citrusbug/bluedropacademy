import { Page, expect, FrameLocator } from '@playwright/test';

export const Chatbotlocator = {
    
    iframeName: 'iframe[name="htmlComp-iframe"]',
    thankYouText: 'תודה על מסירת הפרטים שלך',
    iconName: 'icon',
    headingText: 'שיחות עם בלו',
    InitialMessage: '.system-message-text',
    SubmitBtn: 'button[data-testid="send-message-button"]',
    ScrollingBtn: 'xpath=//*[@id="root"]/div/div[2]/main/div/div/div[2]/div[1]/button/img',
    VerifyBottomTxt : '"בלו" יכול לפעמים לטעות. תמיד תבדקו מידע חשוב עם מבוגר או מקור מהימן!',
    NewsessionBtn: '[data-testid="new-session-click"]',
    LoadMoreBtn: 'button[data-testid="load-more-click"]',
    Searchbar: 'input[placeholder="חפש"]',
    HamburgerMenu: 'button[data-testid="hamburger-menu"]',
    LikeBtn:'[data-testid="like-thumb"]',
    DisLikeBtn:'[data-testid="dislike-thumb"]',
    Copybtn : 'button[data-testid="copy-response"]',
    
    };  
