Feature: User wants to change the site's language

Scenario: A user enter the page and tries to change the language to English
  When I change the language of the site to English
  Then the text should change to English
