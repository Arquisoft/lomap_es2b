Feature: User wants to change the site's language

Scenario: A user enter the page and tries to change the language
  When I enter the site and it is in Spanish
  And I change the language of the site to English
  Then the text should change to English
