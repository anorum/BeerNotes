import statistics
import math


def targetGravity(recipe):
    try:
        fermentables = recipe['fermentables']
        batch_size = recipe['batch_size']
        efficiency = recipe['efficiency']
        return round(sum(((ferm['fermentable']['ppg'] * ferm['amount'])/batch_size)*(efficiency*0.01) for ferm in fermentables)*0.001+1,3)
    except:
        return None

def finalGravity(recipe):
    tg = targetGravity(recipe)
    try:
        avg_attenuation = (tg -1)*1000*statistics.mean([int(yeast['attenuation']) for yeast in recipe['yeasts']])*0.00001
        return round(tg - avg_attenuation,3)


    except:
        return None

def ABV(recipe):
    tg = targetGravity(recipe)
    fg = finalGravity(recipe)
    try:
        return round((tg - fg)*131.25,1)
    except:
        return None

def IBU(recipe):
    tg = targetGravity(recipe)
    batch_size = recipe['batch_size']
    try:
        hops = recipe['hops']
        hop_data = []
        for hop in hops:
            AAU = hop['amount']*hop['hop']['alpha']
            fofg = 1.65 * 0.000125**(tg - 1) 
            if (hop['hop']['hop_type'] == 'pellets'):
                foft = (1-math.e**(1 - hop['hop_schedule']))/4.15
            else:
                foft = (1-math.e**(-.04* hop['hop_schedule']))/4.15
            U = fofg * foft
            hop_data.append((AAU * U * 75)/ batch_size)
        return round(sum(hop_data), 0)
    except:
        return None

def SRM(recipe):
    try:
        fermentables = recipe['fermentables']
        batch_size = recipe['batch_size']
        MCU = sum([(fermentable['fermentable']['lovibond'] * fermentable['amount'])/batch_size for fermentable in fermentables])
        return round(1.4922 * MCU ** .6859, 2)

    except:
        return None