<p align="center">
  <img src="https://github.com/frlinh/game-analysis/blob/fdc8454a27b0f7e3e6a4803bcdb4b287c3759457/static/images/llbanner.png" />
</p>

# <p align="center"> League of Legends <br> Champion Mastery Analysis </p>

<figure>
  <p align="center"><img src="https://user-images.githubusercontent.com/31219195/187048890-b2bcf629-4aa1-4830-8005-8f08c6f5cd12.png" height="100px" />
    <img src="https://user-images.githubusercontent.com/31219195/187048891-d7444dbf-bc26-4585-9351-1659e6c0a7fe.png" height="100px" />
    <img src="https://user-images.githubusercontent.com/31219195/187048893-bde1f308-daf8-4fa6-a03c-81df4553a227.png" height="100px" />
    <img src="https://user-images.githubusercontent.com/31219195/187048895-7898e3a7-14aa-431f-a534-11d3c96521a1.png" height="100px" />
</figure>

## Champion Mastery and Learning Curve

### Overview
LoL is one of the most popular multiplayer games but is still widely notorious for not being noob-friendly, in part due to its many game mechanics and its ever-expanding roster of over 150 playable Champions.

### Purpose
The purpose of this project is to create an easy-to-read and informative dashboard that allows a player to select any Champion and see advanced stats for that Champion. Our analysis will put together data on Champion usage by high-ranked individuals, gathering together the points earned to figure out which are the easiest and hardest to master.

Anybody using this dashboard will be able to use this information to help make choices about which Champions they'd like to purchase and play. It can additionally be used as an entry funnel for new or curious players who would like to know which Champions would be the most accessible to try first without having to understand a lot of granular details about the game.


**Questions:**

- What Champions are easy to master?

- What Champions are difficult to master?

- Are the newer Champions harder to learn than the older Champions?

- What Champions are easier to use, based on role?

## Resources
### Definitions (to-do):
### Data Sources:
- Riot Developer tools ([Documentation](https://developer.riotgames.com/docs/lol)):
  - APIs used:
    - [champion-mastery-v4](https://developer.riotgames.com/apis#champion-mastery-v4) - _'Champion entries for all champions' and 'Total champion mastery score' by encrypted summonerID_
    - [league-v4](https://developer.riotgames.com/apis#league-v4) - _All league entries for Ranked Solo 5x5 by encrypted summonerID including Master+ leagues_
  - [Champion Information](http://ddragon.leagueoflegends.com/cdn/12.15.1/data/en_US/champion.json) from DataDragon 
 
### Tools:

- **Database:** pgAdmin 4 and PostgreSQL, Amazon Web Services (AWS)

- **Analyzing Data:** Jupyter, Pandas

- **Machining Learning:** Imbalanced-learn, Scikit-learn, Tensorflow

- **Data Visualization:** JavaScript, Plotly, CSS, Flask, Tableau, HTML


### Communication Protocols:

**Team Players:** Linh Ha, Stella Kim, Becky Nguyen, Kevin Zhang, Peter Villalpando

**Communication Portal:** Slack

**Zoom Meetings:** Monday from 6:30 PM to 9 PM, Wednesday from 6:30 PM to 9 PM, and Saturday from 10 AM to 12 PM

## Database
Our database joins multiple sources of summoner data and other relevant gameplay stats across all champions. In order to hone in our analysis, we set the following specifications for our data:
- **Region:** North America (NA1)
- **Queue:** Ranked Solo 5x5
- **League:** Master I and higher 

### Schema
_ERD Version 1_
<p align="center"><img src="https://user-images.githubusercontent.com/31219195/187050868-c3c9bb3c-01e7-4017-89e1-950e2a7f6100.png" width="300" /></p>

- The ```champions``` table contains all the built-in Champion details and attributes.
- The ```summoners``` table contains a list of (encrypted) summonerIDs that were extracted from Master, Grandmaster, and Challenger game entries using the leaguev4 API as well as external leaderboards
- The ```champion-mastery``` table contains all the available Champion Mastery details for a specific Summoner from the champion-masteryv4 API.
- The ```total-champion-mastery-score``` is a two-column table that contains the Summoner's encrypted summonerID and total Mastery Score
- The ```master-league-ranked-5x5```, ```grandmaster-league-ranked5x5```, and ```challenger-league-ranked5x5``` tables contain summoner information for all summoners in its respective league

![pgadmin_setup](https://user-images.githubusercontent.com/31219195/187055283-5b187721-3758-43b8-87a8-b790b7f1d1fe.png)

The database for our project lives in pgAdmin. The tables are imported from the .sql ERD created in [Quick DBD](http://quickdatabasediagrams.com) and have been populated with data from the .csv raw data that was cleaned up beforehand using Python in a Jupyter notebook. Each table was queried to confirm that data was properly added. The Data Output window at the bottom of pgAdmin displays the results of the highlighted query.

## Data Analysis
Once the Databases are pulled from the API and Json files, Data cleanup begins in order to process the Data through the Machine learning code.
Using Jupyter Notebook, Google Collab, and Python, the Data analysis teams aim to create a clean data sheet from the Databases. 

For simple access, Github files were downloaded through Raw files and converted to CVS locally.

![Screen Shot 2022-08-28 at 3 43 47 PM](https://user-images.githubusercontent.com/100393032/187097623-d38a9e8a-23e5-45bf-85d2-87c06217144b.png)

Once the Database was pulled locally, cleanup begins with the dropping of columns unnecessary to the Analysis of the file, as well as null values. This allows the code to run cleanly and without issues. The columns that were kept were decided in the group meetings, dependent upon the purpose of the Champion mastery.

<img width="756" alt="Screen Shot 2022-09-12 at 1 05 47 AM" src="https://user-images.githubusercontent.com/100896787/189537586-672839f2-06b5-479d-9e8f-d9e8a98f090f.png">

After the cleanup, we create a new dataframe of Champions and their average number of points, the total number of points, and the total number of summons. 

<img width="802" alt="Screen Shot 2022-09-12 at 1 07 45 AM" src="https://user-images.githubusercontent.com/100896787/189537670-faf8ed80-e03b-4495-849c-3eea4839fede.png">

A dataframe showing off Champions and their stats is created. 

<img width="1091" alt="Screen Shot 2022-09-12 at 1 43 45 AM" src="https://user-images.githubusercontent.com/100896787/189539202-09e55b41-8a69-4f81-8871-69721e054a4b.png">

We sort the Champions and create a new dataframe to show the stats per level. Afterward, we get the averages of those stats/elements.

<img width="821" alt="Screen Shot 2022-09-12 at 1 46 24 AM" src="https://user-images.githubusercontent.com/100896787/189539344-437ed5e2-bbf5-4b3f-ac0c-5f2b20ed0e3c.png">

Taking the sum of their average scores, we place them into skill bins that tell us their MasteryRanking.

<img width="1154" alt="Screen Shot 2022-09-12 at 1 48 40 AM" src="https://user-images.githubusercontent.com/100896787/189539425-95f0fc1b-92d3-4680-9655-132a0534c410.png">

With this, we will be able to see which Champions are easy, intermediate, and difficult. Now that the analysis has been done based on all the summoner data and Champion stats, we'll be able to run our machine learning models.

## Machining Learning
For our project, we practiced using various machine learning models to test which would be the best fit. 

### Logistic Regression
With logistic regression, we split our dataset into test and training, then scale the data before training and evaluating our model. Our current model shows: 

<img width="656" alt="Screen Shot 2022-09-12 at 1 32 53 AM" src="https://user-images.githubusercontent.com/100896787/189538786-a94add10-c8f9-42c7-b355-e7377a44f128.png">

### Basic Neural Network
Similar to a logistic regression, a basic neural network can predict a dependent output variable from independent input variables. After defining the basic neural network model, we compile, train, and evaluate using test data. Our current dummy model showed an accuracy rate less than our logistic regression model:

<img width="714" alt="Screen Shot 2022-09-12 at 1 31 14 AM" src="https://user-images.githubusercontent.com/100896787/189538724-680ecb63-95ce-4bed-b6cc-6b16f2a3f128.png">

### Deep Learning Model
With a deep learning model, we would be using more than one layer with the hopes of increasing the accuracy. This, unfortunately, did not happen with our model:

<img width="730" alt="Screen Shot 2022-09-12 at 1 33 45 AM" src="https://user-images.githubusercontent.com/100896787/189538832-5f454707-6ff4-41e2-a6c8-7f99addc4fae.png">

### Random Forest
Our final try was with a random forest model. Upon our first try, the accuracy score was 1.00. 

<img width="655" alt="Screen Shot 2022-09-12 at 1 34 50 AM" src="https://user-images.githubusercontent.com/100896787/189538872-be8595b5-ff95-401e-89da-f3a2ed7be57b.png">

We decided to evaluate this model further and discovered the 'crit' column contained zero values and the 'attackspeed' also contained zero because it was initially a decimal figure.  We dropped the 'crit' column altogether as it did not contain any valuable figures.  We added a lambda function to multiply 'attackspeed' by 10 before converting the datatype to an integer. By doing this, we were able to optimize and produce a Random Forest predictive score of 0.98.

## Conclusion & Results
The Random Forest is the best model to use because it had the highest accuracy score whereas the other models all had an accuracy score below 0.372. 

We were able to successfully create a [website](https://frlinh.github.io/LoLchampionsdiploy.github.io/) that can be filtered to show Champion stats, and a [dashboard](https://public.tableau.com/app/profile/kevin.qin.zhang/viz/League-of-Legends-Mastery-Story/Story1) that can help a beginner easily search to find what Champions would be easier to master. 

We would like to note that there are some limitations to this analysis. It is difficult to have a full analysis that captures all Champions because Riot releases a new Champion every few months. Because of this, there is not enough data on those newly released Champions to be included in our analysis. For our project, the 11 last Champions were not included. 

## Presentation
Here is the Google Slides version of our [presentation](https://docs.google.com/presentation/d/1F-JlsLppbihsJczyLr8Sn_S8Bs4aVmP5UtRGdgwIj4I/edit?usp=sharing).
