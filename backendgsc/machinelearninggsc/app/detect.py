import time
from absl import app, flags, logging
from absl.flags import FLAGS
import cv2
import numpy as np
import tensorflow as tf
from yolov3_tf2.models import (
    YoloV3, YoloV3Tiny
)
from yolov3_tf2.dataset import transform_images
from yolov3_tf2.utils import draw_outputs

flags.DEFINE_string('classes', './data/coco.names', 'path to classes file')
flags.DEFINE_string('weights', './checkpoints/yolov3.tf',
                    'path to weights file')
flags.DEFINE_boolean('tiny', False, 'yolov3 or yolov3-tiny')
flags.DEFINE_integer('size', 416, 'resize images to')
flags.DEFINE_string('image', './data/girl.png', 'path to input image')
flags.DEFINE_string('output', './output.jpg', 'path to output image')
flags.DEFINE_integer('num_classes', 80, 'number of classes in the model')
yolo = None
class_names = None


def predict(img="./data/meme.jpg", is_file=False):
    global yolo
    global class_names
    if is_array:
        img = tf.image.decode_image(img, channels=3)
    else:
        img = tf.image.decode_image(open(img, 'rb').read(), channels=3)
    img = tf.expand_dims(img, 0)
    img = transform_images(img, FLAGS.size)

    t1 = time.time()
    boxes, scores, classes, nums = yolo(img)
    t2 = time.time()
    logging.info('time: {}'.format(t2 - t1))

    logging.info('detections:')
    detections = []
    wh = np.flip(img.shape[1:3])
    for i in range(nums[0]):
        current_box = boxes[0][i]
        x1y1 = tuple(
            (np.array((current_box[0], current_box[2])) * wh))
        x2y2 = tuple(
            (np.array((current_box[2], current_box[3])) * wh))
        score = np.array(scores[0][i])
        detection = dict(
            className=class_names[int(classes[0][i])],
            score=float(score),
            topLeft=x1y1,
            bottomLeft=x2y2,
        )
        detections.append(detection)
        # logging.info('\t{}, {}, {}'.format(class_names[int(classes[0][i])],
        #                                    np.array(scores[0][i]),
        #                                    np.array(boxes[0][i])))
    return detections
    # img = cv2.imread(FLAGS.image)
    # img = draw_outputs(img, (boxes, scores, classes, nums), class_names)
    # cv2.imwrite(FLAGS.output, img)


def main(args):
    global yolo
    global class_names
    yolo = YoloV3(classes=FLAGS.num_classes)

    yolo.load_weights(FLAGS.weights)
    logging.info('weights loaded')

    class_names = [c.strip() for c in open(FLAGS.classes).readlines()]
    logging.info('classes loaded')

    logging.info('output saved to: {}'.format(FLAGS.output))


def run():
    try:
        app.run(main)
    except SystemExit:
        pass


if __name__ == '__main__':
    run()
