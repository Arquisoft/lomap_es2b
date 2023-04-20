Feature: Loging in with a SolidCommunity user

Scenario: The user has a SolidCommunity account and is entering the site
  Given a user with a SolidCommunity account that has no marker saved
  When I select SolidCommunity as my login provider and click login
  And I will be redirected to the SolidCommunity login site and I enter my Solid credentials
  Then I'm redirected back to LoMap and I should see the map page
