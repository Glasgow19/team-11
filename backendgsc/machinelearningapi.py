from yolov3tf2.detect import run
import sys
import os

# Absolute Path of the module
absFilePath = os.path.abspath(__file__)
print(absFilePath)
fileDir = os.path.dirname(os.path.abspath(
    __file__))   # Directory of the Module
print(fileDir)
# Directory of the Module directory
parentDir = os.path.dirname(fileDir)
print(parentDir)
# Get the directory for StringFunctions
newPath = os.path.join(parentDir, 'yolov3tf2')
print(newPath)
# Add path into PYTHONPATH
sys.path.append(newPath)
