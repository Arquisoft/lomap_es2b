Feature: Loging in with a SolidCommunity user

Scenario: A user enter the page and checks the About section
  When I enter the page and click the about button
  Then the about popup should show up
